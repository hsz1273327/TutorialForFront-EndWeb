FROM rabbitmq:3.13.0-management
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_web_mqtt