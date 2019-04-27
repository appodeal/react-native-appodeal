
Pod::Spec.new do |s|
  s.name         = "Appodeal"
  s.version      = "2.4.10"
  s.summary      = "Appodeal"
  s.description  = <<-DESC
                  RNAppodeal
                   DESC
  s.homepage     = "appodal.com"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/appodeal/CocoaPods.git", :tag => "master" }
  s.source_files  = "RNAppodeal/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  