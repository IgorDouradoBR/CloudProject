
from flask import Flask, json, jsonify, request
from flask_cors import CORS
from dbms.dict_db.sistema import Sistema
app = Flask(__name__)

CORS(app)   
sistema = Sistema()
nomes = {"", " "}

@app.route('/keys', methods = ["POST"])
def create_name():
    carrega = request.data
    atributos = json.loads(carrega)

    key = (int(atributos["prateleira"]),int(atributos["setor"]))

    if key in sistema.get_peso():  
        if (int(int(atributos["peso"])+int(sistema.get_peso()[key]))> sistema.get_pesoMax()) or  (int(int(atributos["volume"])+int(sistema.get_volume()[key]))> sistema.get_volumeMax()):
            print(sistema.get_peso()[key]+ int(atributos["peso"]))
            print(sistema.get_volume()[key]+ int(atributos["volume"]))
            print(sistema.get_pesoMax())
            print(sistema.get_volumeMax())
            

            return jsonify({"errorMsg": "Peso e/ou volume máximo excedido"}), 404
    if (atributos["nome"] in nomes):
        return jsonify({"errorMsg": "Nome já cadastrado, tente com o botão de update"}), 400
    sistema.create(atributos["nome"], atributos)
    nomes.add(atributos["nome"])
    print(sistema.get_peso()[key])
    return jsonify(atributos), 201


'''
@app.route('/keys/<nome>')
def read_name(nome):
    value = sistema.read(nome)
    if (value is None):
        return jsonify({"nome": nome, "errorMsg": "not found"}), 404
    value["nome"] = nome
    return jsonify(value), 200
'''


@app.route('/keys/<nome>', methods = ["PUT"])
def update_name(nome):
    value = json.loads(request.data)
    if (not sistema.update(nome, value)):
        return jsonify({"nome": nome, "errorMsg": "bad request"}), 400
    value["nome"] = nome
    return jsonify(value), 200

@app.route('/keys/<nome>', methods = ["DELETE"])
def delete_name(nome):
    value = sistema.read(nome)
    if not value:
        return jsonify({"nome": nome, "errorMsg": "not found"}), 404
    if (not sistema.delete(nome)):
        return jsonify({"nome": nome, "errorMsg": "not found"}), 404
    value["nome"] = nome
    return jsonify(value), 200

'''
@app.route('/keys/<setor>')
def busca_setor(setor):
    dicionario = sistema.buscaSetor( setor)
    
        
    return jsonify(dicionario), 200
'''
'''
#prestando k k k K
@app.route('/keys/<prateleira>')
def busca_prateleira(prateleira):
    dicionario = sistema.buscaPrateleira( prateleira)
    
        
    return jsonify(dicionario), 200
'''
@app.route('/keys/<setor>')
def busca_prat_setor(setor):
    dicionario = sistema.buscaSetor( setor)
    
    vetor = {}
    for i in dicionario:
        if dicionario[i].get("prateleira") not in vetor.values(): #Para não haver repetições
            vetor[i]=dicionario[i].get("prateleira")    
    return jsonify(vetor), 200



if __name__ == "__main__":
    app.run(host = 'localhost',port=5000, debug=True)
