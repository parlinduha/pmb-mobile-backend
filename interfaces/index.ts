export type Person = {
  id: string
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  gender: string
}

export type Information = {
  id: string
  title: string
  description: string
  date: string
}

export type Persyaratan = {
  id: string
  title: string
  description: string
}

export type Prosedure = {
  id: string
  title: string
  description: string
}

export type Perkuliahan = {
  id: string
  title: string
  description: string
}

export type JadwalBiaya = {
  id: string
  title: string
  fee: string
}

export type ResponseError = {
  message: string
}