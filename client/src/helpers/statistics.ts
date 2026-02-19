export type BooleanCount = {
  yes?: number
  no?: number
}

export type WikiStatistics = {
  firstEdit: string
  lastEdit: string
  editCount: number
  uniqueUsers: number
  topCountries: {
    [name: string]: number
  }
  topCities: {
    [name: string]: number
  }
  anonymous: BooleanCount
  bots: BooleanCount
  minorEdits: BooleanCount
  newPageEdits: BooleanCount
  unreviewedEdits: BooleanCount
  changeDelta: {
    label: string
    timestamp: number
    charactersChangedThisMinute: number
    totalCharactersChanged: number
  }[]
};
