const { Audio } = require('../__mocks__/Audio.ts')

global.Audio = jest.fn().mockImplementation(() => ({
  pause: Audio.pause,
  play: Audio.play
}))
