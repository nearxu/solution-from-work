#### mac install and uninstall

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"


ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"

taobao io
cd "\$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

brew install node

brew search node

brew doctor

brew unlink node  // cancel now node

brew link node@10 [--force]

rm -f /usr/local/bin/npm // delete all npm

npm rebuild node-sass/package