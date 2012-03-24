class Asset < ActiveRecord::Base
  belongs_to :project
  has_attached_file :asset, :styles => {:thumb => "100x100", :large => "960x580"},
  :storage => :s3,
    :bucket => ENV['S3_BUCKET_NAME'],
    :s3_credentials => {
      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
    }
  
  validates_attachment_content_type :asset, :content_type => /image\/(gif|jpeg|pjpeg|png)/i, :message => 'The large picture must be a jpg, png, or gif'
end
