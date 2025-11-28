const { getDefaultConfig } = require('expo/metro-config')
const {
  wrapWithAudioAPIMetroConfig,
} = require('react-native-audio-api/metro-config')

const config = getDefaultConfig(__dirname)

config.resolver.sourceExts.push('cjs')
config.resolver.unstable_enablePackageExports = false

module.exports = wrapWithAudioAPIMetroConfig(config)
