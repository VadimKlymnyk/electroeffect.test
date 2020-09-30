export interface ITodo {
  body: string,
  created_at: string,
  id: string,
  status: boolean,
  title: string,
  updated_at: string,
}

export interface formParams{
  body: string,
  status: boolean,
  title: string,
}

export interface requestTodo {
  body: string,
  status: boolean,
  title: string,
}

export interface loginParams {
  username: string,
  password: boolean,
}

export interface signUpParams {
  username: string,
  password: boolean,
  first_name: string | undefined,
  last_name: string | undefined,
  email: string | undefined,
}