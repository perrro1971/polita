CONFIG = YAML.load_file(File.expand_path('config/config.yml', Rails.root))[Rails.env].recursive_symbolize_keys!
