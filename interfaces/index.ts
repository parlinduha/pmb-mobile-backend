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

export type Maba = {
   id: string,
        major1: string,
        major2: string,
        wavePeriod:string,
        class: string,
        fullName: string,
        gender: string,
        birthPlace: string,
        birthDate: string,
        homePhoneAreaCode:string,
        homePhoneNumber: string,
        mobileNumber: string,
        fullAddress: string,
        subDistrict: string,
        district: string,
        city: string,
        province: string,
        email: string,
        graduationYear: string,
        diplomaNumber: string,
        schoolOrigin: string,
        religion: string,
        fatherName: string,
        fatherAddress: string,
        fatherOccupation: string,
        fatherMobileNumber:string,
        motherName: string,
        motherAddress: string,
        motherOccupation: string,
        motherMobileNumber: string,
        paymentProof: string
}

export type ResponseError = {
  message: string
}