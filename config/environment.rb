# Load the rails application
require File.expand_path('../application', __FILE__)

# Load core extentions
Dir[File.join(Rails.root, "lib", "core_ext", "*.rb")].each {|l| require l }

# Initialize the rails application
Upload::Application.initialize!
