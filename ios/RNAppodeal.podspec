require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name         = "RNAppodeal"
  s.version      = package['version']
  s.summary      = "RNAppodeal"
  s.description  = <<-DESC
                  RNAppodeal
                   DESC
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.author       = package['author']
  s.platform     = :ios, "7.0"
  s.source       = { :git => package['repository']['url'], :tag => "master" }
  s.source_files  = "RNAppodeal/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "Appodeal/Core"
  s.dependency "React"

end
