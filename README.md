c'est une application angular qui me permet de creer generer le champ D d'un notam mais d'une maniere plus explicite (sans mot clés notam) pour ensuite les envoyer via une api , 
voici les cas que doit gerer voici tous les cas possible que j'ai trouvé (peut etre que tu trouvera d'autre):
-	samedi, dimanche, lundi H24
-	samedi, dimanche, lundi du 08H00 au 14H00
-	samedi, dimanche, lundi du 08H00 au 14H00 et du 18H00 au 21H00
-	samedi, dimanche, lundi  Lever au coucher du soleil
-	
-	Samedi H24, dimanche du 09H00 au 14H00, lundi du 08H00 au 14H00
-	Samedi H24, dimanche du 09H00 au 14H00 et du 15H00 au 22H00, lundi du 08H00 au 14H00, mardi du Lever au coucher du soleil
-	
-	Dimache au jeudi H24
-	Dimache au jeudi du 08H00 au 14H00
-	Dimache au jeudi du 08H00 au 14H00 et du 18H00 au 21H00
-	Dimache au jeudi Lever au coucher du soleil

-	 Tous les jours du 08H00 au 14H00
-	Tous les jours du 08H00 au 14H00 et du 18H00 au 21H00
-	Tous les jours du Lever au coucher du soleil

-	Tous les jours sauf mardi H24
-	Tous les jours sauf mardi du 08H00 au 14H00
-	Tous les jours sauf mardi du 08H00 au 14H00 et du 18H00 au 21H00
-	Tous les jours sauf mardi du Lever au coucher du soleil


-   2, 3, 4 avril, 5, 6, 7 mai H24
-   2, 3, 4 avril, 5, 6, 7 mai du 08H00 au 14H00
-   2, 3, 4 avril, 5, 6, 7 mai du 08H00 au 14H00 et du 18H00 au 21H00
-   2, 3, 4 avril, 5, 6, 7 mai Lever au coucher du soleil

-   2 avril H24, 3 avril du 09H00 au 14H00, 4 avril du 08H00 au 14H00
-   2 avril H24, 3 avril du 09H00 au 14H00 et du 15H00 au 22H00, 4 du 08H00 au 14H00, mardi du Lever au coucher du soleil

-   du 2 au 10 avril H24
-   du 2 au 10 avril du 08H00 au 14H00
-   du 2 au 10 avril du 08H00 au 14H00 et du 18H00 au 21H00
-   du 2 au 10 avril Lever au coucher du soleil

-   du 2 au 10 avril H24, du 11 au 20 avril du 09H00 au 14H00
-   du 2 au 10 avril du 09H00 au 14H00 et du 15H00 au 22H00, du 11 au 20 avril du 08H00 au 14H00 et du 18H00 au 21H00, du 2 au 10 avril Lever au coucher du soleil
