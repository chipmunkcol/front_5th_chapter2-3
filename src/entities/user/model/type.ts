// 위 객체 아래 User 인터페이스에 맞게 변환
export interface SelectedUser {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  username: string
  email: string
  phone: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
  }
  image: string
  company: {
    name: string
    title: string
  }
}
