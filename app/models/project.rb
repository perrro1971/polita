class Project < ActiveRecord::Base
  validates :title, :presence => true
  
  has_attached_file :photo, :styles => {:thumb => "100x100", :small => "220x175"},
    :storage => :s3,
    :bucket => CONFIG[:amazon][:s3_bucket],
    :path => ":attachment/:id/:style/:basename.:extension",
    :s3_credentials => {
      :access_key_id => CONFIG[:amazon][:access_key_id],
      :secret_access_key => CONFIG[:amazon][:secret_access_key]
    }
  
  has_many :assets, :dependent => :delete_all
  accepts_nested_attributes_for :assets, :allow_destroy => true
  
  validates_attachment_content_type :photo, :content_type => /image\/(gif|jpeg|pjpeg|png)/i, :message => 'The small picture must be a jpg, png, or gif'
end
