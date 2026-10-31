export default function configurarSockets(io) {
  io.on('connection', (socket) => {
    socket.on('sala:entrar', (codigoSala) => {
      if (typeof codigoSala !== 'string' || !codigoSala.trim()) return;
      const sala = codigoSala.trim().toUpperCase();
      socket.join(sala);
      io.to(sala).emit('sala:participantes', {
        sala,
        quantidade: io.sockets.adapter.rooms.get(sala)?.size ?? 0
      });
    });

    socket.on('disconnecting', () => {
      for (const sala of socket.rooms) {
        if (sala !== socket.id) {
          const quantidade = Math.max((io.sockets.adapter.rooms.get(sala)?.size ?? 1) - 1, 0);
          io.to(sala).emit('sala:participantes', { sala, quantidade });
        }
      }
    });
  });
}
