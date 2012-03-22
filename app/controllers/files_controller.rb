class FilesController < ApplicationController
  before_filter :authenticate_admin!, :except => [:index]
  
  def index
    @project = Project.find(params[:id])
    render :partial => "files/work"
  end
  
  def show
    asset = Asset.find(params[:id])
    send_file asset.asset.path, :filename => asset.asset_file_name,
                                :content_type => asset.asset_content_type
  end
  
  def new
    @project = Project.new
    asset = @project.assets.build
    render :partial => "files/form", :locals => { :number => params[:number].to_i, :asset => asset }
  end
  
  def destroy
    @result = {}
    asset = Asset.find(params[:id])
    asset.destroy
    if asset.destroy
      respond_to do |format|  
        format.html { render :nothing => true }  
        format.js   { render :nothing => true }  
      end  
    end
    
  end
  
end
