const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./server.js']

const doc = {
    info: {
        title: 'sushi',
        description: 'sushi API',
    },
    host: 'sushi.wac.ovh',
    schemes: ['http'],
};

swaggerAutogen(outputFile,
    endpointsFiles, doc).then(() => {
    console.log('doc generated');
})