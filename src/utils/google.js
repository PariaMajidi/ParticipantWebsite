/* eslint-disable no-undef */

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
]

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES =
  ' https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets '

export const fetchSounds = async folderId => {
  try {
    const result = await gapi.client.drive.files.list({
      q: `mimeType='audio/wav' and '${folderId}' in parents`,
      spaces: 'drive',
      fields: 'files(id, webContentLink, webViewLink, name)',
      pageSize: 1000,
    })

    console.log('result', result)

    return result?.result?.files || []
  } catch (error) {
    console.error('error', error)
  }

  return []
}

export const fetchDatabase = async folderId => {
  try {
    const result = await gapi.client.drive.files.list({
      q: `name='Database' and '${folderId}' in parents`,
      spaces: 'drive',
      fields: 'files(id)',
      pageSize: 1000,
    })
    console.log('database', result?.result?.files)

    return result?.result?.files[0]?.id
  } catch (error) {
    console.error('error', error)
  }

  return []
}

// base64ArrayBuffer

export const downloadFile = fileId =>
  gapi.client.drive.files
    .get({
      fileId: fileId,
      alt: 'media',
    })
    .then(result => btoa(result.body))

export const writeSheet = async (row, database) => {
  // const result = await gapi.client.sheets.spreadsheets.values.get({
  //   spreadsheetId: "1zsX46IRkQFkZVG_M5v7Y9WMjYF4Fxq45vt2F0FzxTFM",
  //   range: "Sheet1",
  // });

  const values = [row]

  gapi.client.sheets.spreadsheets.values
    .append({
      spreadsheetId: database,
      resource: { values, majorDimension: 'ROWS' },
      range: 'Sheet1',
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'USER_ENTERED',
    })
    .then(response => {
      var result = response.result
      console.log(`${result.updates.updatedCells} cells appended.`)
    })
    .catch(error => {
      console.log('error', error)
    })
}

export const initialize = callback => dispatch =>
  gapi.load('client:auth2', async () => {
    try {
      await gapi.client.init({
        apiKey: process.env.REACT_APP_API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: SCOPES,
      })
      console.log(
        'authenticated',
        gapi.auth2.getAuthInstance().isSignedIn.get()
      )

      gapi.auth2.getAuthInstance().isSignedIn.listen(callback)

      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        callback()
      }

      // const results = await gapi.client.people.people.get({
      //   resourceName: "people/me",
      //   "requestMask.includeField": "person.names",
      // });
    } catch (error) {
      console.log('Error: ', error)
    }
  })

export const signIn = () => gapi.auth2.getAuthInstance().signIn()

export const signOut = () => gapi.auth2.getAuthInstance().signOut()
