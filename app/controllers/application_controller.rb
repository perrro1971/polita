class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :set_body_id
  
  
  private
  
  def set_body_id
    @body_id = controller_name + '_' + action_name
  end
  
end
