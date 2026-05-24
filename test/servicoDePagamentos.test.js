import ServicoDePagamento from '../src/servicoDePagamentos.js';
import assert from 'node:assert';

describe('Testes da classe de Serviço de Pagamentos', () => {
    
    it('Validar um pagamento maior que 100.00 com a categoria "cara"', function() {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('4124-2551-6331', 'Assaí Atacadista', 762.11);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(ultimoPagamento.codigoBarras, '4124-2551-6331');
        assert.equal(ultimoPagamento.empresa, 'Assaí Atacadista');
        assert.equal(ultimoPagamento.valor, 762.11);
        assert.equal(ultimoPagamento.categoria, 'cara');
    });

    it('Validar um pagamento menor ou igual a 100.00 com a categoria "padrão"', function() {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('4124-2551-6331', 'Posto Ipiranga', 45.70);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(ultimoPagamento.codigoBarras, '4124-2551-6331');
        assert.equal(ultimoPagamento.empresa, 'Posto Ipiranga');
        assert.equal(ultimoPagamento.valor, 45.70);
        assert.equal(ultimoPagamento.categoria, 'padrão');
    });

    it('Validar que a consulta traz apenas o último pagamento que foi realizado', function() {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('7264-9284-2911', 'Shopping Metrô Tatuapé', 51.22);
        servicoDePagamento.pagar('7264-9284-2912', 'Renner', 650.00);
        servicoDePagamento.pagar('7264-9284-2913', 'Burguer King', 54.90);
        
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(ultimoPagamento.codigoBarras, '7264-9284-2913');
        assert.equal(ultimoPagamento.empresa, 'Burguer King');
        assert.equal(ultimoPagamento.valor, 54.90);
        assert.equal(ultimoPagamento.categoria, 'padrão');
    });
});