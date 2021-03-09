# Geocoding PostGIS

### Importação da Base de dados

[Download da base de dados](http://download.geofabrik.de/south-america/brazil/sul-latest-free.shp.zip)

..* É necessário o download e a instalação do PostGIS para a execução deste projeto.

Renomeie o arquivo *gis_osm_roads_free_1.shp* obtido no download da base de dados para *roads.shp*.

Utilize o executável *PostGIS Bundle 3 for PostgreSQL Shapefile and DBF Loader Exporter* (a partir da instalação do PostGIS) 
para importar o arquivo shapefile *roads.shp* em sua instância ativa do PostgreSQL.

### Execução do projeto

..* É necessária a instalação do Node.js versão LTS para a execução. Juntamente à instalação do Node, o npm (Node Package Manager) também deve ser instalado.

[Download do Node.js](https://nodejs.org/en/)

1. Edite o arquivo [main.js](https://github.com/Arthurdb1999/geocoding-postgis/blob/master/main.js), das linhas 7 até 13, com suas credenciais de acesso à sua
instância do PostgreSQL;

2. Utilizando o prompt de comando (cmd), navegue até a pasta raiz do projeto "geocoding-postgis", através do comando `cd`;

3. Na pasta raiz do projeto, execute o comando `npm i`;

4. Para executar o projeto, execute o comando `node main.js`;

5. Para alterar o endereço de busca, basta editar o parâmetro da função `findAddress` (linha 19), salvar o arquivo, e executar o passo anterior novamente!

### Resultados Obtidos

**(Em progresso)**

| Endereço | Localização obtida | Localização real | Distância (m) |
| ------------- |:-------------:| :-----:| -----:|
| col 3 is      | right-aligned | $1600 | 2m |
| col 2 is      | centered      |   $12 | 3m |
| zebra stripes | are neat      |    $1 | 350m |
| col 2 is      | centered      |   $12 | 3m |
| zebra stripes | are neat      |    $1 | 350m |

### Considerações finais

A biblioteca de similaridade utilizada ([string-similarity](https://www.npmjs.com/package/string-similarity)) implementa o algoritmo do [coeficiente de Dice](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) para a comparação das strings.
