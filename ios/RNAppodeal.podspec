
Pod::Spec.new do |s|
  s.name         = "RNAppodeal"
  s.version      = "2.4.10"
  s.summary      = "RNAppodeal"
  s.description  = <<-DESC
                  RNAppodeal
                   DESC
  s.homepage     = "appodeal.com"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "9.0"
  s.source       = { :git => "https://github.com/appodeal/CocoaPods.git", :tag => "master" }
  s.source_files  = "RNAppodeal/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "Appodeal","2.4.10"

end

  