Pod::Spec.new do |s|
  package = JSON.parse(File.read(File.join(__dir__, "package.json")))

  s.name         = "RNAppodeal"
  s.version      = package['version']
  s.summary      = "React Native plugin for Appodeal SDK"
  s.description  = <<-DESC
                  React Native plugin for Appodeal SDK. It supports interstitial, rewarded video and banner ads
                   DESC
  s.homepage     = "https://appodeal.com"
  s.license      = "MIT"
  s.author       = { "author" => "appodeal.com" }
  s.platform     = :ios, "12.0"
  s.source       = { :git => package['repository']['url'], :tag => "master" }
  s.source_files = "ios/**/*.{h,m}"
  
  s.requires_arc = true
  s.static_framework = true

  s.dependency "React"
  s.dependency "Appodeal", "3.3.1"
  s.dependency "APDIABAdapter", "3.3.1.0"
end

  
