
// const server1 = 'http://192.168.1.120:8000/api'
// const file_server1 =  'http://192.168.1.120:8000'


const Api = 'https://caballeros.chseguros.com.co/api'
const serverPublic = 'https://caballeros.chseguros.com.co'


const base_url = function base_url(server, uri){
    return `${server}/${uri}`
}



const token_wompi = "pub_prod_jnHAsVXnEzFO6zApm2t5UsDlZZsinWI5"
//const token_wompi = "pub_test_gquQzr4do6fPxI2XRm65ORkuwWf86Tox"

const ApiWompi = "https://production.wompi.co/v1/"
//const ApiWompi = "https://sandbox.wompi.co/v1/"




export  {
    base_url,
    Api,
    serverPublic,
    ApiWompi,
    token_wompi
}