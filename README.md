# Geocoding PostGIS 🌎🐘

## Importação da Base de dados 💾

[Download da base de dados](http://download.geofabrik.de/south-america/brazil/sul-latest-free.shp.zip)

* É necessário o download e a instalação do PostGIS para a execução deste projeto.

Renomeie o arquivo ***gis_osm_roads_free_1.shp*** obtido no download da base de dados para *roads.shp*.

Utilize o executável ***PostGIS Bundle 3 for PostgreSQL Shapefile and DBF Loader Exporter*** (a partir da instalação do PostGIS) 
para importar o arquivo shapefile ***roads.shp*** em sua instância ativa do PostgreSQL.

## Execução do projeto 🔥

* É necessária a instalação do Node.js versão LTS para a execução. Juntamente, o npm (Node Package Manager) também deve ser instalado.

[Download do Node.js](https://nodejs.org/en/)

1. Edite o arquivo [main.js](https://github.com/Arthurdb1999/geocoding-postgis/blob/master/main.js), das linhas 7 até 13, com suas credenciais de acesso à sua
instância do Postgres com PostGIS;

2. Utilizando o prompt de comando (cmd), navegue até a pasta raiz do projeto "geocoding-postgis", através do comando `cd`;

3. Na pasta raiz do projeto, execute o comando `npm i`;

4. Para executar o projeto, execute o comando `node main.js`;

5. Para alterar o endereço de busca, basta editar o parâmetro da função `findAddress` (linha 19), salvar o arquivo, e executar o passo anterior novamente!

## Resultados Obtidos 💹

| Endereço | Localização obtida (LonLat) | Localização real (LonLat) | Distância |
| ------------- |:-------------:| :-----:| -----:|
| Rua coronel cordova | -50.32514958600639, -27.820352441974872| -50.3287812, -27.8175391 | 350m |
| Av Dom Pedro II | -49.07308521180593, -25.369003988772914 | -50.3222737, -27.8121736 | 393km |
| Av marechal floriano | -51.59089548265946, -27.766630811637654 | -50.3357847, -27.8228067 | 194km |
| rua heitor villa lobos | -51.11143903616328, -29.69445052072231 | -50.3409759, -27.800868 | 315km |
| Rua Lauro Muller | -51.17765813176809, -29.883299200766206 | -51.9675394, -28.8473601 | 328km |

## Considerações finais 🎉🎉

A principal causa da imprecisão do algoritmo se deve a falta da informação da cidade na entrada do usuário.
O usuário até consegue pesquisar por cidade, porém, a tabela ***roads*** não possui informações para que seja
feito o cruzamento com a cidade, deixando o algoritmo impreciso.

Exemplo de imprecisão: Existem 14 registros para 'Rua Lauro Muller' na base de dados

A biblioteca de similaridade utilizada ([string-similarity](https://www.npmjs.com/package/string-similarity)) implementa o algoritmo do [coeficiente de Dice](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) para a comparação das strings.
