# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network :forwarded_port, guest: 4000, host: 4000
  config.vm.provision "docker" do |d|
    d.pull_images "andredumas/github-pages"
    d.run "andredumas/github-pages",
        args: "-v /vagrant:/site -p 4000:4000",
        cmd: "serve --watch --force_polling"
  end
end