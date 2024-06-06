import { Audio } from '../__mocks__/Audio'

global.Audio = jest.fn().mockImplementation(() => ({
  pause: Audio.pause,
  play: Audio.play
}))
