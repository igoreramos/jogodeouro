const botaoEntrada = document.querySelector(".botao-entrada");
        const botaoSaida = document.querySelector(".botao-saida");
        const dataHoraAtualSpan = document.getElementById("dataHoraAtual");
        const quemEVoceSelect = document.getElementById("quemEVoce");
        const registrosLista = document.getElementById("registrosLista");

        botaoEntrada.addEventListener("click", () => {
            marcarPonto("Entrada");
        });

        botaoSaida.addEventListener("click", () => {
            marcarPonto("Saída");
        });

        function marcarPonto(tipo) {
            const agora = new Date();
            const horaAtual = agora.getHours();
            const minutosAtual = agora.getMinutes();
            const selecionado = quemEVoceSelect.value;
            
            const minutosAtrasados = calcularMinutosAtrasados(horaAtual, minutosAtual);

            if (tipo === "Entrada") {
                if (horaAtual === 18 && minutosAtual >= 1 && minutosAtual <= 31) {
                    const taxaDesconto = minutosAtrasados * 0.05;
                    const registro = `${selecionado} bateu o ponto (${tipo}) - ${agora.toLocaleString()}. Atraso de ${minutosAtrasados} minutos. Taxa a ser descontada: $${taxaDesconto.toFixed(2)}`;
                    const registroItem = document.createElement("li");
                    registroItem.textContent = registro;
                    registrosLista.appendChild(registroItem);
                } else {
                    const registro = `${selecionado} bateu o ponto (${tipo}) - ${agora.toLocaleString()}`;
                    const registroItem = document.createElement("li");
                    registroItem.textContent = registro;
                    registrosLista.appendChild(registroItem);
                }
            } else if (tipo === "Saída") {
                if (horaAtual === 19 && minutosAtual >= 31) {
                    const taxaFalta = 10.00;
                    const registro = `${selecionado} bateu o ponto (${tipo}) - ${agora.toLocaleString()}. Levou falta. Taxa de falta: $${taxaFalta.toFixed(2)}`;
                    const registroItem = document.createElement("li");
                    registroItem.textContent = registro;
                    registrosLista.appendChild(registroItem);
                } else {
                    const registro = `${selecionado} bateu o ponto (${tipo}) - ${agora.toLocaleString()}`;
                    const registroItem = document.createElement("li");
                    registroItem.textContent = registro;
                    registrosLista.appendChild(registroItem);
                }
            }

            // Limpar a pergunta "Quem é você?" após o registro
            quemEVoceSelect.value = "";

            // Limpar a data e hora atual após o registro
            dataHoraAtualSpan.textContent = "";
        }

        function calcularMinutosAtrasados(hora, minutos) {
            if (hora === 18) {
                return 60 - minutos;
            } else if (hora > 18) {
                return (60 - minutos) + ((hora - 19) * 60);
            } else {
                return 0;
            }
        }