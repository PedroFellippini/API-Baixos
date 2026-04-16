import express, { request, response } from "express";
import cors from "cors";

const app = express();
const porta = process.env.PORT || 8000;

app.use(cors({
    origin:"https://avaliacaopam-1.onrender.com"
}));

const baixos = [
    {
        id: 1,
        marca: "Fender",
        modelo: "jazz bass",
        linha: "American Ultra II",
        numCordas: 5,
        paisFab: "EUA",
        ano: 2025
    },
    {
        id: 2,
        marca: "Ernie Ball",
        modelo: "Music Man StingRay",
        linha: "50th Anniversary",
        numCordas: 4,
        paisFab: "EUA",
        ano: 2026
    },
    {
        id: 3,
        marca: "Fender",
        modelo: "jazz bass",
        linha: "American Performer",
        numCordas: 4,
        paisFab: "EUA",
        ano: 2025
    },
    {
        id: 4,
        marca: "Sadowsky",
        modelo: "jazz bass",
        linha: "MetroExpress",
        numCordas: 5,
        paisFab: "China",
        ano: 2025
    },
    {
        id: 5,
        marca: "Sire",
        modelo: "jazz bass",
        linha: "Marcus Miller V7",
        numCordas: 5,
        paisFab: "Indonesia",
        ano: 2023
    },
    {
        id: 6,
        marca: "Lakland",
        modelo: "jazz bass",
        linha: "5502",
        numCordas: 5,
        paisFab: "USA",
        ano: 2024
    },
    {
        id: 7,
        marca: "Fender",
        modelo: "precision bass",
        linha: "standard",
        numCordas: 4,
        paisFab: "Indonesia",
        ano: 2020
    },
    {
        id: 8,
        marca: "Fender",
        modelo: "jazz bass",
        linha: "American Deluxe V",
        numCordas: 5,
        paisFab: "EUA",
        ano: 2012
    },
    {
        id: 9,
        marca: "Yamaha",
        modelo: "BB",
        linha: "BB735A",
        numCordas: 5,
        paisFab: "Indonesia",
        ano: 2025
    },
    {
        id: 10,
        marca: "Fender",
        modelo: "jazz bass",
        linha: "Player Series",
        numCordas: 4,
        paisFab: "Mexico",
        ano: 2024
    },
    {
        id: 11,
        marca: "Sire",
        modelo: "Music Man",
        linha: "Marcus Miller Z3",
        numCordas: 5,
        paisFab: "Indonesia",
        ano: 2025
    },
    {
        id: 12,
        marca: "Sire",
        modelo: "Jazz Bass",
        linha: "Marcus Miller V3",
        numCordas: 4,
        paisFab: "Indonesia",
        ano: 2023
    },
    {
        id: 13,
        marca: "Fender",
        modelo: "Jazz Bass",
        linha: "Custom Shop Jaco Pastorius Tribute Fretless",
        numCordas: 4,
        paisFab: "EUA",
        ano: 2000
    },
    {
        id: 14,
        marca: "Rickenbacker ",
        modelo: "Rickenbacker",
        linha: "4003",
        numCordas: 4,
        paisFab: "EUA",
        ano: 1979
    },
    {
        id: 15,
        marca: "Yamaha",
        modelo: "Modern",
        linha: "TRB 6cpi",
        numCordas: 6,
        paisFab: "Japão",
        ano: 1990
    },  
    {
        id: 16,
        marca: "Sadowsky",
        modelo: "Jazz Bass",
        linha: "NYC Custom Will Lee Signature",
        numCordas: 4,
        paisFab: "EUA",
        ano: 2024
    },
    {
        id: 17,
        marca: "Tagima",
        modelo: "Modern",
        linha: "Millenium Top 6",
        numCordas: 6,
        paisFab: "China",
        ano: 2018
    },
];
//tela "principal"
app.get("/", (request, response) => {
    response.send("<h1>Avaliação <u>API</u> - <u>API</u> encontrada!</h1><hr><h2><i><u>API</u></i> de Contrabaixos elétricos 🎸</h2>");
});

//buscar API
app.get("/baixos", (req, res) => {
    let resultado = baixos;

    const { marca, modelo, linha, numCordas, paisFab, ano } = req.query;

    if (marca) {
        resultado = resultado.filter(b =>
            b.marca.toLowerCase().includes(marca.toLowerCase())
        );
    }

    if (modelo) {
        resultado = resultado.filter(b =>
            b.modelo.toLowerCase().includes(modelo.toLowerCase())
        );
    }

    if (linha) {
        resultado = resultado.filter(b =>
            b.linha.toLowerCase().includes(linha.toLowerCase())
        );
    }

    if (numCordas) {
        resultado = resultado.filter(b =>
            b.numCordas == parseInt(numCordas)
        );
    }

    if (paisFab) {
        resultado = resultado.filter(b =>
            b.paisFab.toLowerCase().includes(paisFab.toLowerCase())
        );
    }

    if (ano) {
        resultado = resultado.filter(b =>
            b.ano == parseInt(ano)
        );
    }

    res.json(resultado);
});

//buscar id
app.get("/baixos/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const baixo = baixos.find(b=> b.id == id); //find() = usado para buscar condições ÚNICAS.

    if(!baixo) {
        return response.status(404).json({
            mensagem: "Baixo não localizado!"
        });
    }

    response.status(200).json(baixo);
});

//buscar marca
app.get("/baixos/marca/:marca", (request, response) => {
    const marca = request.params.marca.toLowerCase(); // Normaliza para letras minúsculas
    const baixo = baixos.filter(b => //vai retornar a nossa array com tds os elementos 👍
        b.marca.toLowerCase().includes(marca) //includes() = faz uma busca parcial na String. Ex: marca= Music Man => ele consegue encontrar com apenas "Music" ou "Man" 
    );

    if(baixo.length === 0) {
        return response.status(404).json({
            mensagem: "Nenhum baixo dessa marca encontrado!"
        });
    }

    response.status(200).json(baixo);
});

//buscar modelo
app.get("/baixos/modelo/:modelo", (request, response) => {
    const modelo = request.params.modelo.toLowerCase(); 
    const baixo = baixos.filter(b => 
        b.modelo.toLowerCase().includes(modelo) 
    );

    if(baixo.length === 0) {
        return response.status(404).json({
            mensagem: "Nenhum baixo desse modelo encontrado!"
        });
    }

    response.status(200).json(baixo);
});

//buscar linha
app.get("/baixos/linha/:linha", (request, response) => {
    const linha = request.params.linha.toLowerCase(); 
    const baixo = baixos.filter(b => 
        b.linha.toLowerCase().includes(linha) 
    );

    if(baixo.length === 0) {
        return response.status(404).json({
            mensagem: "Nenhum baixo encontrado por essa linha!"
        });
    }

    response.status(200).json(baixo);
});

//buscar numCordas
app.get("/baixos/numCordas/:numCordas", (request, response) => {
    const numCordas = parseInt(request.params.numCordas);
    const baixo = baixos.filter(b=> b.numCordas == numCordas); //filter() = Usado para fazer busca MÚLTIPLA, diferente do "find()" que é para uma condição ÚNICA

    if(!baixo.length === 0) {
        return response.status(404).json({
            mensagem: "Nenhum baixo localizado com esse numero de cordas!"
        });
    }

    response.status(200).json(baixo);
});

//buscar paisfab
app.get("/baixos/paisFab/:paisFab", (request, response) => {
    const paisFab = request.params.paisFab.toLowerCase(); // Normaliza para letras minúsculas
    const baixo = baixos.filter(b => 
        b.paisFab.toLowerCase().includes(paisFab) //includes() = faz uma busca parcial na String. Ex: marca= Music Man => ele consegue encontrar com apenas "Music" ou "Man" 
    );

    if(baixo.length === 0) {
        return response.status(404).json({
            mensagem: "Nenhum baixo encontrado com essa linha!"
        });
    }

    response.status(200).json(baixo);
});

//buscar ano
app.get("/baixos/ano/:ano", (request, response) => {
    const ano = parseInt(request.params.ano);
    const baixo = baixos.filter(b=> b.ano == ano);

    if(!baixo.length === 0) {
        return response.status(404).json({
            mensagem: "Nenhum baixo desse ano foi encontrado!"
        });
    }

    response.status(200).json(baixo);
});

app.listen(porta, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

