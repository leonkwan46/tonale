import type {
  AudioBuffer,
  AudioBufferSourceNode,
  AudioContext,
  BiquadFilterNode,
  GainNode
} from 'react-native-audio-api'
import { calculatePlaybackRate } from '../config/pitchFrequencies'

const C4_SAMPLE_URL = 'https://software-mansion.github.io/react-native-audio-api/audio/sounds/C4.mp3'

const ENVELOPE_CONFIG = {
  attack: {
    start: 0.001,
    end: 1,
    duration: 0.01
  },
  release: {
    target: 0.0001,
    duration: 3.0,
    stopDelay: 0.1
  },
  minDuration: 0.1
} as const

interface EQFilterConfig {
  type: 'lowpass' | 'highpass' | 'bandpass' | 'lowshelf' | 'highshelf' | 'peaking' | 'notch' | 'allpass'
  frequency: number
  Q?: number
  gain?: number
}

interface EQConfig {
  enabled: boolean
  filters: EQFilterConfig[]
}

const DEFAULT_EQ_CONFIG: EQConfig = {
  enabled: false,
  filters: []
}

interface PlayingNote {
  audioSourceNode: AudioBufferSourceNode
  volumeEnvelopeNode: GainNode
  eqFilterNodes: BiquadFilterNode[]
  startedAt: number
}

type PlayingNotesMap = Partial<Record<string, PlayingNote>>
class PianoAudioManager {
  private static instance: PianoAudioManager | null = null
  private audioContext: AudioContext | null = null
  private baseBuffer: AudioBuffer | null = null
  private playingNotes: PlayingNotesMap = {}
  private isLoading = false
  private isInitialized = false
  private audioApiModule: typeof import('react-native-audio-api') | null = null
  private isAvailable = false

  private constructor() {}

  static getInstance(): PianoAudioManager {
    if (!PianoAudioManager.instance) {
      PianoAudioManager.instance = new PianoAudioManager()
    }
    return PianoAudioManager.instance
  }

  private async loadAudioModule(): Promise<boolean> {
    if (this.audioApiModule !== null) {
      return this.isAvailable
    }

    try {
      const audioApi = await import('react-native-audio-api')

      if (!audioApi?.AudioContext || typeof audioApi.AudioContext !== 'function') {
        this.audioApiModule = null
        this.isAvailable = false
        return false
      }

      this.audioApiModule = audioApi
      this.isAvailable = true
      return true
    } catch {
      this.audioApiModule = null
      this.isAvailable = false
      return false
    }
  }

  async initialize(): Promise<void> {
    if (this.isLoading || this.isInitialized) return

    const available = await this.loadAudioModule()
    if (!available) return

    this.isLoading = true
    try {
      if (!this.audioApiModule) return
      const { AudioContext } = this.audioApiModule
      if (!this.audioContext) {
        this.audioContext = new AudioContext()
      }

      const response = await fetch(C4_SAMPLE_URL)
      const arrayBuffer = await response.arrayBuffer()
      this.baseBuffer = await this.audioContext!.decodeAudioData(arrayBuffer)

      if (this.baseBuffer) {
        this.isInitialized = true
      }
    } catch {
      this.isAvailable = false
    } finally {
      this.isLoading = false
    }
  }

  isReady(): boolean {
    return (
      this.isAvailable &&
      this.isInitialized &&
      !!this.audioContext &&
      !!this.baseBuffer
    )
  }

  async suspend(): Promise<void> {
    if (this.audioContext && this.audioContext.state !== 'closed') {
      await this.audioContext.suspend()
    }
  }

  async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }

  playNote(noteName: string): (() => void) | null {
    if (!this.isAvailable || !this.audioContext || !this.isReady() || !this.baseBuffer) {
      return null
    }

    if (this.audioContext.state === 'suspended') {
      this.resume().catch(() => {})
    }

    const audioContext = this.audioContext
    const tNow = audioContext.currentTime

    if (this.playingNotes[noteName]) {
      this.stopNote(noteName)
    }

    const audioSourceNode = this.createAudioSource(noteName)
    const volumeEnvelopeNode = this.createVolumeEnvelope(audioContext)
    const eqFilterNodes = this.createEQFilters(audioContext)
    const finalOutputNode = eqFilterNodes.length > 0 ? eqFilterNodes[eqFilterNodes.length - 1] : volumeEnvelopeNode

    this.connectAudioGraph(audioSourceNode, volumeEnvelopeNode, eqFilterNodes, finalOutputNode, audioContext)
    this.setVolumeAttack(volumeEnvelopeNode, tNow)
    audioSourceNode.start(tNow)

    this.playingNotes[noteName] = {
      audioSourceNode,
      volumeEnvelopeNode,
      eqFilterNodes,
      startedAt: tNow
    }

    return () => this.stopNote(noteName)
  }

  private createAudioSource(noteName: string): AudioBufferSourceNode {
    const audioSourceNode = this.audioContext!.createBufferSource()
    audioSourceNode.buffer = this.baseBuffer!

    const playbackRate = calculatePlaybackRate(noteName)
    if (audioSourceNode.playbackRate) {
      audioSourceNode.playbackRate.value = playbackRate
    }

    return audioSourceNode
  }

  private createVolumeEnvelope(audioContext: AudioContext): GainNode {
    const volumeEnvelopeNode = audioContext.createGain()
    return volumeEnvelopeNode
  }

  private createEQFilters(audioContext: AudioContext): BiquadFilterNode[] {
    const eqFilterNodes: BiquadFilterNode[] = []

    if (!DEFAULT_EQ_CONFIG.enabled || DEFAULT_EQ_CONFIG.filters.length === 0) {
      return eqFilterNodes
    }

    DEFAULT_EQ_CONFIG.filters.forEach((filterConfig) => {
      const filter = audioContext.createBiquadFilter()
      filter.type = filterConfig.type
      filter.frequency.value = filterConfig.frequency

      if (filterConfig.Q !== undefined) {
        filter.Q.value = filterConfig.Q
      }

      if (filterConfig.gain !== undefined) {
        filter.gain.value = filterConfig.gain
      }

      eqFilterNodes.push(filter)
    })

    return eqFilterNodes
  }

  private connectAudioGraph(
    audioSourceNode: AudioBufferSourceNode,
    volumeEnvelopeNode: GainNode,
    eqFilterNodes: BiquadFilterNode[],
    finalOutputNode: GainNode | BiquadFilterNode,
    audioContext: AudioContext
  ): void {
    audioSourceNode.connect(volumeEnvelopeNode)

    eqFilterNodes.forEach((filter, index) => {
      if (index === 0) {
        volumeEnvelopeNode.connect(filter)
      } else {
        eqFilterNodes[index - 1].connect(filter)
      }
    })

    finalOutputNode.connect(audioContext.destination)
  }

  private setVolumeAttack(volumeEnvelopeNode: GainNode, tNow: number): void {
    const { attack } = ENVELOPE_CONFIG
    volumeEnvelopeNode.gain.setValueAtTime(attack.start, tNow)
    volumeEnvelopeNode.gain.exponentialRampToValueAtTime(attack.end, tNow + attack.duration)
  }

  stopNote(noteName: string): void {
    const playingNote = this.playingNotes[noteName]

    if (!playingNote || !this.audioContext) {
      return
    }

    const { audioSourceNode, volumeEnvelopeNode, startedAt } = playingNote
    const tNow = this.audioContext.currentTime
    const tStop = Math.max(tNow, startedAt + ENVELOPE_CONFIG.minDuration)
    const { release } = ENVELOPE_CONFIG

    volumeEnvelopeNode.gain.exponentialRampToValueAtTime(release.target, tStop + release.duration)
    volumeEnvelopeNode.gain.setValueAtTime(0, tStop + release.duration + 0.1)
    audioSourceNode.stop(tStop + release.duration + release.stopDelay)

    delete this.playingNotes[noteName]
  }

  stopAllNotes(): void {
    Object.keys(this.playingNotes).forEach((noteName) => {
      this.stopNote(noteName)
    })
  }

  async cleanup(): Promise<void> {
    this.stopAllNotes()

    if (this.audioContext && this.audioContext.state !== 'closed') {
      await this.audioContext.close()
      this.audioContext = null
    }

    this.baseBuffer = null
    this.playingNotes = {}
    this.isInitialized = false
  }
}

export const getPianoAudioManager = () => PianoAudioManager.getInstance()
