module.exports = {
  reactStrictMode: true,
  env: {
    CONEXION_LOGIN_BD:'mongodb+srv://codigoBitMx:5taffSoport3@cluster0.0txm0.mongodb.net/archivos?retryWrites=true&w=majority',
    secretKey:'g/4JSZE7AoOQVtncmUqEiQ==',
    CLOUDINARY_URL:'cloudinary://183487733814841:WKr4toenw5-boZOCgfZq4Bcty60@codigobit',
    CLOUDINARY_CLOUD_NAME: 'codigobit',
    CLOUDINARY_API_KEY: '183487733814841',
    CLOUDINARY_API_SECRET: 'WKr4toenw5-boZOCgfZq4Bcty60',
    BUCKET_NAME:'bucket-archivo',   
    AWS_REGION:'us-east-2',
    AWS_ACCESS_KEY_ID:'AKIAWKUUJIEQMLFJPQH7',
    AWS_SECRET_ACCESS_KEY:'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'
  },


  async headers(){
    return [
      {
        source: '/login/usuarios',
        headers: [
          {
            key: 'x-auth-token',
            value: 'valor del token'
          }
        ]
      }
    ]
  }

}



