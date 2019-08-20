#!/bin/sh

apt-get install fontconfig

FONT_INSTALL_PATH="/app/.fonts"
FONT_NAME="Comfortaa-Bold.4bf19e1"
NEW_FONT_NAME="Comfortaa-Bold"

if [ "$1" = "--remove" ]; then
    cd $FONT_INSTALL_PATH
    rm -rf "$FONT_NAME.ttf"
    rm -rf "$NEW_FONT_NAME.ttf"
    cd -
    echo "Font ($NEW_FONT_NAME) removed!"
    exit 0
fi

if [ "$1" = "--help" ]; then
    echo "Usage: ./font-installer --remove"
    exit 0
fi

if [ -f "$FONT_INSTALL_PATH/$NEW_FONT_NAME.ttf" ]; then
    echo "$NEW_FONT_NAME already installed"
    fc-list | grep "$NEW_FONT_NAME"
    exit 0
fi

if [ ! -d "$FONT_INSTALL_PATH" ]; then
    echo "Unable to detect the install directory path '$FONT_INSTALL_PATH'.\nCreating folder"
    mkdir $FONT_INSTALL_PATH
fi

FONT_DL_URL="https://dairynomics.netlify.com/static/fonts/$FONT_NAME.ttf"

# pull user requested fonts from the FONT repository releases & unpack
echo " "
echo "Pulling font from the Dairynomics website"
curl -L -O "$FONT_DL_URL"

echo "Building the font"

# install
if [ -f "$FONT_NAME.ttf" ]; then
    echo " "
    echo "Installing the fonts..."

    # move fonts to install directory
    echo "Installing $FONT_NAME.ttf on path $FONT_INSTALL_PATH/$FONT_NAME.ttf"

    mv "$FONT_NAME.ttf" "$FONT_INSTALL_PATH/$NEW_FONT_NAME.ttf"

    # clear and regenerate font cache
    echo " "
    echo "Clearing and regenerating the font cache.  You will see a stream of text as this
occurs..."
    echo " "
    fc-cache -f -v

    echo " "
    echo "Testing. You should see the expected install filepaths in the output below..."
    fc-list | grep "$NEW_FONT_NAME"

    echo " "
    echo "Install of Font $NEW_FONT_NAME complete."
    exit 0
else
    echo "Unable to identify the unpacked font directory. Install failed."
    exit 1
fi
