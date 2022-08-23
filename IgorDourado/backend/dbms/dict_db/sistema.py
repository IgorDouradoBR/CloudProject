
class Sistema():
    dicionario = {}
    pesos= {}
    volumes= {}
    PESOMAX = 200
    pesocorrente = 0
    VOLUMEMAX = 500
    volumecorrente = 0
    
    def __init__(self, dicionario={}, pesos={}, volumes={}):
        self.dicionario = dicionario
        self.pesos = pesos
        self.PESOMAX = 200
        self.pesocorrente = 0
        self.VOLUMEMAX = 500
        self.volumecorrente = 0


    def create(self, nome, value):
        self.dicionario[nome] = value
        key = (int(self.dicionario[nome].get("prateleira")), int(self.dicionario[nome].get("setor")))
        
        auxilPeso= int(self.pesos.get(key, 0))
        print(auxilPeso)
        auxilVolume= int(self.volumes.get(key, 0))
        if auxilPeso == 0:
            self.pesos[key] =  self.dicionario[nome].get("peso")
        else:
            self.pesos[key] = int(self.pesos[key]) + int(self.dicionario[nome].get("peso"))
        if auxilVolume == 0:
            self.volumes[key] =  self.dicionario[nome].get("volume")
        else:
            self.volumes[key] = auxilVolume + int(self.dicionario[nome].get("volume"))

        return True

    def get_peso(self):
        return self.pesos

    def get_pesoMax(self):
        return self.PESOMAX

    def get_volume(self):
        return self.volumes

    def get_volumeMax(self):
        return self.VOLUMEMAX

    def read(self, nome):

        if nome in self.dicionario:
            return self.dicionario[nome]
        else:
            return None

    def buscaSetor(self, setor):

        vetor = {}
        for i in self.dicionario:
            aux = self.dicionario[i]
            if aux.get("setor") == setor:
                vetor[i]=(self.dicionario[i])
        if len(vetor)>=0:
            return vetor
        else:
            return None

    def buscaPrateleira(self, prateleira):
        vetor = {}
        for i in self.dicionario:
            aux = self.dicionario[i]
            if aux.get("prateleira") == prateleira:
                vetor[i](self.dicionario[i])
        if len(vetor)>=0:
            return vetor
        else:
            return None


    def update(self, nome, value):
        
        try:
            if (len(value["setor"]) == 0
                    and len(value["prateleira"]) == 0):
                return False
            if (nome not in self.dicionario):
                return False
        except KeyError:
            print("nome error")
            return False
        key = (int(self.dicionario[nome].get("prateleira")), int(self.dicionario[nome].get("setor")))
        self.pesos[key] =  int(self.pesos[key]) - int(self.dicionario[nome].get("peso"))
        self.volumes[key] =  int(self.volumes[key]) - int(self.dicionario[nome].get("volume"))       
        self.dicionario[nome] = value
        self.pesos[key] =  int(self.pesos[key]) + int(self.dicionario[nome].get("peso"))
        self.volumes[key] =  int(self.volumes[key]) + int(self.dicionario[nome].get("volume"))
       


        return True


    def delete(self, nome):

        if nome not in self.dicionario:
            return False
        key = (int(self.dicionario[nome].get("prateleira")), int(self.dicionario[nome].get("setor")))
        self.pesos[key] =  int(self.pesos[key]) - int(self.dicionario[nome].get("peso"))
        self.volumes[key] =  int(self.volumes[key]) - int(self.dicionario[nome].get("volume"))  

        del self.dicionario[nome]
        return True






