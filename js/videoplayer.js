document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('video-vturb');
  const playPauseButton = document.getElementById('play-pause-button');
  const muteButton = document.getElementById('mute-button');

  video.muted = false; // Iniciar sem mudo
  video.loop = true;
  
  // Atualizar ícone para indicar som ligado
  document.getElementById('mute-icon').className = 'fas fa-volume-up';

  // Tentar reproduzir com som, se falhar, tentar com mudo (para contornar restrições do navegador)
  video.play().catch((error) => {
    console.log('Erro ao tentar autoplay com som:', error);
    // Tentar novamente com mudo (padrão em navegadores)
    video.muted = true;
    document.getElementById('mute-icon').className = 'fas fa-volume-mute';
    video.play().catch((e) => {
      console.log('Erro ao tentar autoplay mesmo com mudo:', e);
    });
  });

  playPauseButton.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      document.getElementById('play-pause-icon').className = 'fas fa-pause';
    } else {
      video.pause();
      document.getElementById('play-pause-icon').className = 'fas fa-play';
    }
  });

  muteButton.addEventListener('click', function() {
    if (video.muted) {
      video.muted = false;
      document.getElementById('mute-icon').className = 'fas fa-volume-up';
    } else {
      video.muted = true;
      document.getElementById('mute-icon').className = 'fas fa-volume-mute';
    }
  });

  video.addEventListener('ended', () => {
    document.getElementById('play-pause-icon').className = 'fas fa-play';
  });
  
  // Ativar som quando o usuário interagir com a página pela primeira vez
  const activateSound = () => {
    if (video.muted) {
      video.muted = false;
      document.getElementById('mute-icon').className = 'fas fa-volume-up';
      // Remover os event listeners após a primeira interação
      document.removeEventListener('click', activateSound);
      document.removeEventListener('touchstart', activateSound);
      document.removeEventListener('keydown', activateSound);
    }
  };
  
  // Adicionar event listeners para interação do usuário
  document.addEventListener('click', activateSound);
  document.addEventListener('touchstart', activateSound);
  document.addEventListener('keydown', activateSound);
});
