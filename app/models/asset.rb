class Asset < ActiveRecord::Base
  belongs_to :project
  has_attached_file :asset, :styles => {:thumb => "100x100", :large => "960x580"},
    :storage => :s3,
    :bucket => CONFIG[:amazon][:s3_bucket],
    :path => ":attachment/:id/:style/:basename.:extension",
    :s3_credentials => {
      :access_key_id => CONFIG[:amazon][:access_key_id],
      :secret_access_key => CONFIG[:amazon][:secret_access_key]
    }
  
  validates_attachment_content_type :asset, :content_type => /image\/(gif|jpeg|pjpeg|png)/i, :message => 'The large picture must be a jpg, png, or gif'
end
