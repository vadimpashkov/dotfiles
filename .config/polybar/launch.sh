killall -q polybar
echo "---" | tee -a /tmp/main_bar.log
polybar example >> /tmp/main_bar.log
