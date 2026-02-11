module.exports = {
  apps: [{
    name: 'luxe-segment',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/luxe-segment',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/luxe-segment-error.log',
    out_file: '/var/log/pm2/luxe-segment-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    // Автоматический перезапуск при сбоях
    autorestart: true,
    // Максимальное использование памяти (512MB)
    max_memory_restart: '512M',
    // Задержка перед перезапуском (мс)
    restart_delay: 4000,
    // Количество перезапусков за интервал времени
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
