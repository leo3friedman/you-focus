import path from 'node:path'
import _ from 'lodash/fp'
import fs from 'node:fs'


/**
 * When cleaning up before tests, we want to be very careful that we don't
 *  delete files that we didn't intend to.
 * @param {string} dir - path to the directory which contains the test being run
 *  (e.g. for `src/__tests__/some.test.js` would be `src/__tests__/`)
 * @param {string } subdir - path to delete. Expected to be a child of the beneath the `dir` parameter
 *  (e.g. `src/__tests__/temp/)
 * @return {Promise<undefined>}
 */
export const safeRemoveSubdir = async (dir, subdir) => {
  const absoluteSubdir = path.resolve(subdir)

  if (!_.includes('__tests__', dir)) {
    throw new Error('this is only meant to delete files from a test directory')
  }
  if (_.isEmpty(path.relative(dir, absoluteSubdir))) {
    throw new Error('this should not delete the test directory')
  }
  if (path.relative(dir, absoluteSubdir).startsWith('..')) {
    throw new Error('this is only meant to delete subdirectories')
  }

  return fs.promises.rm(subdir, {
    recursive: true,
    force: true // don't throw error if path doesn't exist
  })
}
