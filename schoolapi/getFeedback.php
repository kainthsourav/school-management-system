<?php
     include 'connection.php';
     header('Access-Control-Allow-Origin: *');
	 
	 $response=array();
if($con)
{
	 if($_SERVER['REQUEST_METHOD'] == 'POST'){
     function test_input($data) {
				  global $con;
				  global $response;
  				$data = trim($data);
  				$data = stripslashes($data);
  				$data = htmlspecialchars($data);
				$data = mysqli_real_escape_string($con,$data);
  				return $data;
				}

				function result($status,$msg){
				global $response;
				global $con;
				mysqli_close($con);
				$response['statuscode']=$status;
				$response['msg']=$msg;
				echo json_encode($response);
				}

				$sql="SELECT * FROM feedback ORDER BY DATE DESC";
				$query = mysqli_query($con,$sql);
		         $count = mysqli_num_rows($query);
				 
		         if ($count == 0) 
				 {	 
			         result(0,"Feedback table is Empty.");  
                 }
		         else
				 { 
					while($row=mysqli_fetch_assoc($query))
					{						   
						$data[]=$row;						
					}
					$response['data']=$data;
					$response['statuscode']=1;
					echo json_encode($response);
				 }			   
    }
    }
	else
	{
		die("Connection failed: " . mysqli_connect_error());
	}
?>
