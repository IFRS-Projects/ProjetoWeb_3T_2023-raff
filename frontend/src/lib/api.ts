import axios from 'axios'
import { createUserType, updateUserType, userLogin, userType } from './types/user'
import { createMovieType, movieType, updateMovieType } from './types/movie'

const api = axios.create({
  withCredentials: true,
  baseURL: `http://localhost:4000`,
})


const simpleBasicFetch = async (
  endpoint: string,
  params: string,
  headers: object,
) => {
  let str = `/${endpoint}`
  if (params !== '') {
    str = `${str}?${params}`
  }

  return await api.get(str, {
    headers,
  })
}

type resultType<T> = {
  conex: boolean
  reqStat: number
  success: boolean
  data: T
  msg: string
  auth: string
}

const basicFetch = async (
  method: string,
  endpoint: string,
  params: object,
  headers: object,
  alertConex?: boolean,
  alertError?: boolean,
): Promise<resultType<any>> => {
  const result = {
    conex: true, // só fica em false quando cai no catch ou não responde nada
    reqStat: 0,
    success: false, // Setado em true quando tudo dá certo e status de retorno é 10
    data: false, // Conteúdo JSON recebido do servidor
    msg: '', // Inserido no Front -> Codigo de status que diz o que será carregado pra lá.
    auth: '',
  }
  try {
    let r: any = false
    try {
      r =
        method === 'POST'
          ? await api.post(`/${endpoint}`, buildParamString(params), {
              validateStatus: function (status) {
                return true
              },
              headers,
            })
          : method === 'GET'
          ? await simpleBasicFetch(endpoint, buildParamString(params), headers)
          : method === 'PATCH' ?
            await api.patch(`/${endpoint}`,buildParamString(params), {
              validateStatus: function (status) {
                return true
              },
              headers,
            })
          : method === 'DELETE'
          ? await api.delete(`/${endpoint}`)
          : false
    } catch (e: any) {
      r = e.response
    }
    console.log('API_R: ', r)
    if (r) {
      result.reqStat = r.status
      result.success = r.status === 200 || r.status === 201

      result.auth = r.headers
        ? r.headers.authorization
        : r.headers.authorization
      if (r.data) result.data = r.data
      const msg = typeof r.data.msg === 'undefined' ? '' : r.data.msg // `stat_${r.status}`;
      if (msg) result.msg = msg
      else result.msg = 'error'
    } else {
      result.conex = false
      result.msg = 'not connection'
    }
  } catch (e) {
    console.log('AXIOS ERR: ', e)
    result.conex = false
    result.msg = 'axios error'
  }
  if (alertError && result.conex && !result.success) alert(result.msg)

  // console.log('API_RESPONSE: ', result);
  return result
}

const buildParamString = (params: any) => {
  let str = ''
  // eslint-disable-next-line array-callback-return
  Object.keys(params).map((key) => {
    let value = params[key]
    if (Array.isArray(value)) {
      value = JSON.stringify(value)
    } else if (value && typeof value === 'object') {
      // value = value.toString();
      if (Object.keys(value).length > 0) {
        let micstr = '['
        // eslint-disable-next-line array-callback-return
        Object.keys(value).map((item) => {
          micstr = `${micstr}"${item}"="${value[item]}",`
        })
        micstr = micstr.slice(0, -1) // remove o último ',';
        value = micstr + ']'
      }
    }

    str = `${str}${key}=${value}&`
  })
  str = str.slice(0, -1) // remove o último '&'
  return str
}


export default {
  user: {
    findAll: async (): Promise<resultType<{ data: userType[]}>> => {
      return await basicFetch('GET', 'users/', {}, {})
    },
    findOne: async (email:string): Promise<resultType<{ data: userType}>> => {
      return await basicFetch('GET', `users/${email}`, {}, {})
    },

    create: async (userData:createUserType): Promise<resultType<{ data: userType}>> => {
      return await basicFetch('POST', `users/`, {...userData}, {})
    },
    update: async (userData:updateUserType): Promise<resultType<{ data: userType}>> => {
      return await basicFetch('PATCH', `users/`, {...userData}, {})
    },
    delete: async (): Promise<resultType<{}>> => {
      return await basicFetch('DELETE', `users/`, {}, {})
    },
  },
  auth: {
    login: async (userData:userLogin): Promise<resultType<{access_token:string}>> => {
      return await basicFetch('POST', `auth/login`, {...userData}, {})
    },
  },
  movies: {
    create: async (movieData:createMovieType): Promise<resultType<{ data: movieType}>> => {
      return await basicFetch('POST', `movies`, {...movieData}, {})
    },
    findAll: async (): Promise<resultType<{ data: movieType[]}>> => {
      return await basicFetch('GET', 'movies/', {}, {})
    },
    findOne: async (email:string): Promise<resultType<{ data: userType}>> => {
      return await basicFetch('GET', `users/${email}`, {}, {})
    },

    update: async (id:string,movieData:updateMovieType): Promise<resultType<{ data: movieType}>> => {
      return await basicFetch('PATCH', `movies/${id}`, {...movieData}, {})
    },
    delete: async (): Promise<resultType<{}>> => {
      return await basicFetch('DELETE', `users/`, {}, {})
    },
    rank: async (): Promise<resultType<{data: movieType[]}>> => {
      return await basicFetch('GET', `movies/rank`, {}, {})
    },
  }

}