killall -q polybar
echo "---" | tee -a /tmp/polybar_main.log
polybar main >> /tmp/polybar_main.log
