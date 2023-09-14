# 使用基础镜像
FROM leekay0218/crmeb-mer

## 复制代码
## 在本地调试注释掉，使用映射把文件映射进去
#ADD ./ /var/www

# 设置工作目录
WORKDIR /var/www

# 设置时区为上海
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    echo '[PHP]\ndate.timezone = "'$TZ'"\n' > /usr/local/etc/php/conf.d/tzone.ini

# 创建 mer_s.conf 配置文件
RUN echo "[program:mer_s]" > /etc/supervisor/conf.d/mer_s.conf && \
    echo "command=php think swoole restart" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "directory=/var/www/" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "autorestart=true" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "startsecs=3" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "startretries=3" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "stdout_logfile=/var/log/supervisor/mer_s.out.log" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "stderr_logfile=/var/log/supervisor/mer_s.err.log" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "stdout_logfile_maxbytes=2MB" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "stderr_logfile_maxbytes=2MB" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "user=root" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "priority=999" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "numprocs=1" >> /etc/supervisor/conf.d/mer_s.conf && \
    echo "process_name=%(program_name)s_%(process_num)02d" >> /etc/supervisor/conf.d/mer_s.conf

# 创建 mer_q.conf 配置文件
RUN echo "[program:mer_q]" > /etc/supervisor/conf.d/mer_q.conf && \
    echo "command=php think queue:work --tries 2" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "directory=/var/www/" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "autorestart=true" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "startsecs=3" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "startretries=3" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "stdout_logfile=/var/log/supervisor/mer_q.out.log" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "stderr_logfile=/var/log/supervisor/mer_q.err.log" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "stdout_logfile_maxbytes=2MB" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "stderr_logfile_maxbytes=2MB" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "user=root" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "priority=999" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "numprocs=1" >> /etc/supervisor/conf.d/mer_q.conf && \
    echo "process_name=%(program_name)s_%(process_num)02d" >> /etc/supervisor/conf.d/mer_q.conf

# 设置入口命令
ENTRYPOINT ["/entrypoint.sh"]

# 创建日志文件
RUN touch /var/www/service.err.log /var/www/service.out.log
