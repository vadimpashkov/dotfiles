#!/usr/bin/env sh

SCREENSHOT_FOLDER_NAME="Pictures/Screenshots/$(date +%d-%m-%Y)/"
OUTPUT_FOLDER="$HOME/$SCREENSHOT_FOLDER_NAME"
SCREENSHOT_NAME="$(date +%H-%M-%S).png"
OUTPUT="$OUTPUT_FOLDER$SCREENSHOT_NAME"

SWAPPY_CONFIG_PATH="$CONFIG_DIR/swappy/config"
DEFAULT_SWAPPY_CONFIG=$(cat "$SWAPPY_CONFIG_PATH")

echo -e "$DEFAULT_SWAPPY_CONFIG\nsave_dir=$OUTPUT_FOLDER\nsave_filename_format=swappy-$SCREENSHOT_NAME" > $SWAPPY_CONFIG_PATH

mkdir -p "$OUTPUT_FOLDER"

print_error() {
	cat <<"EOF"
    screenshot <action>
    ...valid actions are...
        screen - snip screen
        area - snip area
EOF
}

case $1 in
screen)
	grimblast --freeze copysave screen $OUTPUT && swappy -f $OUTPUT ;;
area)
	grimblast --freeze copysave area $OUTPUT && swappy -f $OUTPUT ;;
*)
	print_error ;;
esac

if [ -f "${OUTPUT_FOLDER}${SCREENSHOT_NAME}" ]; then
	notify-send -i "${OUTPUT_FOLDER}${SCREENSHOT_NAME}" "Saved screenshot in ${SCREENSHOT_FOLDER_NAME}${SCREENSHOT_NAME}"
fi

echo -e "$DEFAULT_SWAPPY_CONFIG" > $SWAPPY_CONFIG_PATH

