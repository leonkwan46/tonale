import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    alignItems: 'center'
  },
  questionContainer: {
    marginBottom: scale(30),
    alignItems: 'center'
  },
  questionText: {
    fontSize: scale(18),
    color: '#333',
    textAlign: 'center'
  },
  noteText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#4A90E2'
  },
  keyboardContainer: {
    width: '100%',
    maxWidth: scale(400),
    marginBottom: scale(20)
  },
  keysRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scale(10)
  },
  blackKeysRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scale(20)
  },
  key: {
    marginHorizontal: scale(2),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: scale(40),
    height: scale(60)
  },
  whiteKey: {
    backgroundColor: '#fff',
    borderWidth: scale(1),
    borderColor: '#ddd'
  },
  blackKey: {
    backgroundColor: '#333',
    height: scale(40),
    minWidth: scale(30)
  },
  selectedKey: {
    backgroundColor: '#4A90E2'
  },
  correctKey: {
    backgroundColor: '#4CAF50'
  },
  incorrectKey: {
    backgroundColor: '#F44336'
  },
  keyText: {
    fontSize: scale(14),
    fontWeight: 'bold'
  },
  whiteKeyText: {
    color: '#333'
  },
  blackKeyText: {
    color: '#fff'
  },
  feedbackContainer: {
    marginTop: scale(20),
    alignItems: 'center'
  },
  feedbackText: {
    fontSize: scale(16),
    fontWeight: 'bold'
  },
  correctFeedback: {
    color: '#4CAF50'
  },
  incorrectFeedback: {
    color: '#F44336'
  }
})
