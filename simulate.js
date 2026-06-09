const mqtt = require('mqtt');

// Ganti dengan IP server Ubuntu Anda!
const MQTT_BROKER = 'mqtt://192.168.1.16:1883';

const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
    console.log('✅ Terhubung ke MQTT Broker (Ubuntu)');
    
    setInterval(() => {
        const suhu = (Math.random() * 30 + 20).toFixed(1);
        const kelembaban = (Math.random() * 60 + 30).toFixed(1);
        
        let status;
        if (suhu > 30) status = "panas";
        else if (suhu < 24) status = "dingin";
        else status = "normal";
        
        const data = {
            sensor_id: "SIMULATOR_VSCODE",
            suhu: parseFloat(suhu),
            kelembaban: parseFloat(kelembaban),
            status: status,
            timestamp: new Date().toISOString()
        };
        
        client.publish('sensor/suhu', JSON.stringify(data));
        console.log(`📨 Data dikirim: ${suhu}°C | ${kelembaban}% | ${status}`);
    }, 5000);
});

client.on('error', (err) => {
    console.error('❌ MQTT Error:', err);
});
