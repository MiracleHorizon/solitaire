// REPOSITORY
const REPO_OWNER = 'MiracleHorizon'
const REPO_NAME = 'solitaire'
const REPO_BRANCH = 'main'
const REPO_PATH = `${REPO_OWNER}/${REPO_NAME}`

const GITHUB_USER_CONTENT_PATH = 'raw.githubusercontent.com'
const GITHUB_USER_CONTENT_REPO_PATH = `https://${GITHUB_USER_CONTENT_PATH}/${REPO_PATH}/${REPO_BRANCH}`

export const IMAGES_ASSETS_PATH = '/images/cards'

export const pathForAssets = (path: string): string => {
  const ASSETS_PATH = 'src/assets'

  return `${GITHUB_USER_CONTENT_REPO_PATH}/${ASSETS_PATH}/${path}`
}
