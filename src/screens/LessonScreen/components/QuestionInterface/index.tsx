import { useDevice } from '@/hooks'
import type { QuestionInterface as QuestionInterfaceType } from '@types'
import { type FC } from 'react'
import { QuestionInterfaceContainer } from './QuestionInterface.styles'
import { IndividualNotes, MusicStaffComponent, NoteValue, TimeSignatureComponent, Triplet } from './QuestionTypes/Notation'
import { Playback } from './QuestionTypes/Playback'
import { TermAndSign } from './QuestionTypes/Symbols'
import { QUESTION_TYPE } from './QuestionTypes/types'

interface QuestionInterfaceProps {
  questionInterface: QuestionInterfaceType
  onPlaybackPress?: () => void
  isPlaying?: boolean
  correctAnswer?: string | number[]
  answerInterface?: string
  isAnswering?: boolean
  onPlaybackFinish?: () => void
  onPlaybackStart?: () => void
}

export const QuestionInterface: FC<QuestionInterfaceProps> = ({ 
  questionInterface, 
  onPlaybackPress,
  isPlaying = false,
  correctAnswer,
  answerInterface,
  isAnswering = false,
  onPlaybackFinish,
  onPlaybackStart
}: QuestionInterfaceProps) => {
  const { isTablet } = useDevice()

  const needsExtraHeight = questionInterface.clef && 
    questionInterface.elements && 
    questionInterface.elements.length > 0 &&
    questionInterface.elements.some(element => element.pitch) &&
    questionInterface.type !== QUESTION_TYPE.TERM_AND_SIGN

  const shouldRenderIndividualNotes = questionInterface.type !== QUESTION_TYPE.TIME_SIGNATURE && 
    questionInterface.type !== QUESTION_TYPE.NOTE_VALUE && 
    questionInterface.type !== QUESTION_TYPE.TERM_AND_SIGN && 
    questionInterface.type !== QUESTION_TYPE.PLAYBACK &&
    questionInterface.elements?.length === 1 && 
    !questionInterface.clef

  const shouldRenderMusicStaff = questionInterface.type !== QUESTION_TYPE.TIME_SIGNATURE && 
    questionInterface.type !== QUESTION_TYPE.NOTE_VALUE && 
    questionInterface.type !== QUESTION_TYPE.TERM_AND_SIGN && 
    questionInterface.type !== QUESTION_TYPE.PLAYBACK &&
    !onPlaybackPress &&
    !(questionInterface.elements?.length === 1 && !questionInterface.clef)

  const enableMetronome: boolean = !!(
    (questionInterface.rhythm && !questionInterface.audioFile) ||
    (!!questionInterface.audioFile && !questionInterface.rhythm)
  )

  const shouldRenderPlayback = !!(onPlaybackPress || questionInterface.rhythm || questionInterface.audioFile)

  const renderQuestionInterface = () => {
    switch (questionInterface.type) {
      case QUESTION_TYPE.TIME_SIGNATURE:
        return <TimeSignatureComponent questionInterface={questionInterface} />
      
      case QUESTION_TYPE.NOTE_VALUE:
        return <NoteValue questionInterface={questionInterface} />
      
      case QUESTION_TYPE.TRIPLET:
        return <Triplet questionInterface={questionInterface} />
      
      case QUESTION_TYPE.TERM_AND_SIGN:
        return <TermAndSign questionInterface={questionInterface} />
      
      case QUESTION_TYPE.PLAYBACK:
        return <Playback questionInterface={questionInterface} onPlaybackPress={onPlaybackPress} isPlaying={isPlaying} correctAnswer={correctAnswer} answerInterface={answerInterface} enableMetronome={enableMetronome} isAnswering={isAnswering} onPlaybackFinish={onPlaybackFinish} onPlaybackStart={onPlaybackStart} />
      
      default:
        return (
          <>
            {shouldRenderIndividualNotes && (
              <IndividualNotes questionInterface={questionInterface} />
            )}
            {shouldRenderMusicStaff && (
              <MusicStaffComponent 
                questionInterface={questionInterface} 
                shouldRender={shouldRenderMusicStaff}
                needsExtraHeight={needsExtraHeight || false}
              />
            )}
            {shouldRenderPlayback && (
              <Playback
                questionInterface={questionInterface}
                onPlaybackPress={onPlaybackPress}
                isPlaying={isPlaying}
                correctAnswer={correctAnswer}
                answerInterface={answerInterface}
                enableMetronome={enableMetronome}
                isAnswering={isAnswering}
                onPlaybackFinish={onPlaybackFinish}
                onPlaybackStart={onPlaybackStart}
              />
            )}
          </>
        )
    }
  }

  return (
    <QuestionInterfaceContainer 
      isTablet={isTablet} 
      isSMuFLSymbol={questionInterface.type === QUESTION_TYPE.TERM_AND_SIGN} 
      needsExtraSpacing={needsExtraHeight || false}
    >
      {renderQuestionInterface()}
    </QuestionInterfaceContainer>
  )
}
