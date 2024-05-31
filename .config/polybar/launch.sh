killall -q polybar
echo "---" | tee -a /tmp/polybar_main.log
polybar example >> /tmp/polybar_main.log
