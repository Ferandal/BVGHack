{
  "targets": [
    {
      "target_name": "serverToArduino",
      "type": "executable",
      "sources": [ "main.cpp"],
      "cflags": ["-Wall", "-std=c++11"],
      "conditions": [
        [ "OS=='mac'", {
            "xcode_settings": {
                "OTHER_CPLUSPLUSFLAGS" : ["-std=c++11","-stdlib=libc++"],
                "OTHER_LDFLAGS": ["-stdlib=libc++"],
                "MACOSX_DEPLOYMENT_TARGET": "10.7" }
            }
        ]
      ]
    }
  ]
}