class Asset < ActiveRecord::Base
  belongs_to :project
  has_attached_file :asset, :styles => {:thumb => "100x100", :large => "960x580"}
  
  validates_attachment_content_type :asset, :content_type => /image\/(gif|jpeg|pjpeg|png)/i, :message => 'The large picture must be a jpg, png, or gif'
end
