// Importação das bibliotecas do Postgres e de comparação de strings por similaridade, armazenando
// seus valores em constantes imutáveis.
const { Client } = require('pg')
const similarity = require('string-similarity')

// Parâmetros de conexão com o banco de dados.
const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgis'
})

// A função pode ser executada antes mesmo de ser declarada, isso se deve à um comportamento do
// javascript chamado "Hoisting" ou "Içamento". Esse comportamento faz com que antes da interpretação
// (compilação) do código, todas as declarações de funções e de variáveis sejam elevadas ao topo de 
// seu escopo.
findAddress('Rua Coronel Córdova')

// Declaração da função principal utilizando a palavra reservada "async", pois dentro dela, são 
// executados métodos que demoram a retornar um valor (como uma consulta em banco de dados, por exemplo).
async function findAddress(address) {
    client.connect()

    try {
        let number = address.split(',')[1]
        if (number) {
            number = number.length <= 3
                ? number / 100
                : number.length == 4
                    ? number / 1000
                    : 10000
        }

        // Consulta na tabela, retornando o centróide da geometria em forma de coordenadas geográ-
        // ficas (latitude e longitude).
        const result = await client.query(
            // `SELECT ST_X(ST_Centroid(geom)), ST_Y(ST_Centroid(geom)), ST_LineInterpolatePoint(geom, ${number}), * from roads`
            `SELECT ST_X(ST_Centroid(geom)), ST_Y(ST_Centroid(geom)), name from roads`
        )

        // A palavra reservada let (let it change) instancia uma variável mutável.
        // O método split separa todas as palavras (separadas por espaço) da string, retornando um array
        // com todas elas.
        let splitedWords = address.split(' ')
        let firstWord = splitedWords[0]

        // Uma vez que todos os tipos de logradouro estão salvos na base de dados seguindo um padrão,
        // foi feito um exemplo de tratamento de abreviaturas com Avenida e Rua. As linhas abaixo
        // poderiam ser replicadas para o restante dos tipos de logradouros.
        if (firstWord == 'av' || firstWord == 'Av' || firstWord == 'av.' || firstWord == 'Av.') {
            firstWord = 'Avenida'
            //O método shift remove o primeiro índice do array splitedWords.
            splitedWords.shift()
        } else if (firstWord == 'R' || firstWord == 'R.' || firstWord == 'r' || firstWord == 'r.') {
            firstWord = 'Rua'
            splitedWords.shift()
        }

        // É feita a concatenação do tipo do logradouro (Avenida ou Rua) com o resto das palavras 
        // inseridas pelo usuário. O método join concatena todas as palavras do array em uma string, 
        // separadas por um espaço.
        const formatedAddress = `${firstWord ? firstWord + ' ' : ''}${splitedWords.join(' ')}`

        // o método findBestMatch é da biblioteca de similaridade, ela espera dois parâmetros:
        // 1 - a string base que se deseja comparar;
        // 2 - um array de strings para iterar e comparar com a string base.

        // A consulta ao banco de dados retorna um objeto chamado rows, que é um array com todos 
        // os registros selecionados. O método map percorre o array rows (semelhante ao forEach), e
        // retorna para o método findBestMatch apenas a coluna "name".
        const returnedAddress = similarity.findBestMatch(formatedAddress, result.rows.map(row => {
            // A sintaxe abaixo é chamada if ternário, consiste em: <condition> ? <then> : <else>.
            // O ternário é utilizado para remover os registros cuja coluna "name" é igual a null.
            return row.name ? row.name : ''
        }))

        // Imprime no console a string retornada pelo método de similaridade, o coeficiente de
        // similaridade encontrado, a latitude e a longitude da localização.
        console.log({
            stringMatched: returnedAddress.bestMatch.target,
            similarityCoefficient: returnedAddress.bestMatch.rating,
            lat: result.rows[returnedAddress.bestMatchIndex].st_x,
            lon: result.rows[returnedAddress.bestMatchIndex].st_y,
        })

    } catch (err) {
        console.log('Erro', err)
    } finally {
        client.end()
    }
}