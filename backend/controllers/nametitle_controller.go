package controllers

import (
	"fmt"
	"context"
	"strconv"

	"github.com/Sujitnapa21/app/ent"
	"github.com/Sujitnapa21/app/ent/nametitle"
	"github.com/gin-gonic/gin"
)

// NameTitleController defines the struct for the nametitle controller
type NameTitleController struct {
	client *ent.Client
	router gin.IRouter
}

// NameTitle defines the struct for the nametitle controller
type NameTitle struct {
	Name string
}

// CreateNameTitle handles POST requests for adding nametitle entities
// @Summary Create nametitle
// @Description Create nametitle
// @ID create-nametitle
// @Accept   json
// @Produce  json
// @Param nametitle body ent.NameTitle true "NameTitle entity"
// @Success 200 {object} ent.NameTitle
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles [post]
func (ctl *NameTitleController) CreateNameTitle(c *gin.Context) {
	obj := ent.NameTitle{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "nameTitle binding failed",
		})
		return
	}

	n, err := ctl.client.NameTitle.
		Create().
		SetName(obj.Name).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, n)
}

// GetNameTitle handles GET requests to retrieve a nametitle entity
// @Summary Get a nametitle entity by ID
// @Description get nametitle by ID
// @ID get-nametitle
// @Produce  json
// @Param id path int true "NameTitle ID"
// @Success 200 {object} ent.NameTitle
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles/{id} [get]
func (ctl *NameTitleController) GetNameTitle(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	n, err := ctl.client.NameTitle.
		Query().
		Where(nametitle.IDEQ(int(id))).
		Only(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, n)
}

// ListNameTitle handles request to get a list of nametitle entities
// @Summary List nametitle entities
// @Description list nametitle entities
// @ID list-nametitle
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.NameTitle
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles [get]
func (ctl *NameTitleController) ListNameTitle(c *gin.Context) {
	limitQuery := c.Query("limit")
	limit := 10
	if limitQuery != "" {
		limit64, err := strconv.ParseInt(limitQuery, 10, 64)
		if err == nil {
			limit = int(limit64)
		}
	}

	offsetQuery := c.Query("offset")
	offset := 0
	if offsetQuery != "" {
		offset64, err := strconv.ParseInt(offsetQuery, 10, 64)
		if err == nil {
			offset = int(offset64)
		}
	}

	nametitles, err := ctl.client.NameTitle.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, nametitles)
}

// DeleteNameTitle handles DELETE requests to delete a nametitle entity
// @Summary Delete a nametitle entity by ID
// @Description get nametitle by ID
// @ID delete-nametitle
// @Produce  json
// @Param id path int true "NameTitle ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles/{id} [delete]
func (ctl *NameTitleController) DeleteNameTitle(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.NameTitle.
		DeleteOneID(int(id)).
		Exec(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{"result": fmt.Sprintf("ok deleted %v", id)})
}

// UpdateNameTitle handles PUT requests to update a nametitle entity
// @Summary Update a nametitle entity by ID
// @Description update nametitle by ID
// @ID update-nametitle
// @Accept   json
// @Produce  json
// @Param id path int true "NameTitle ID"
// @Param nametitletype body ent.NameTitle true "NameTitle entity"
// @Success 200 {object} ent.NameTitle
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles/{id} [put]
func (ctl *NameTitleController) UpdateNameTitle(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.NameTitle{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "nametitle binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	n, err := ctl.client.NameTitle.
		UpdateOneID(int(id)).
		SetName(obj.Name).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, n)
}


// NewNameTitleController creates and registers handles for the nametitle controller
func NewNameTitleController(router gin.IRouter, client *ent.Client) *NameTitleController {
	nc := &NameTitleController{
		client: client,
		router: router,
	}
	nc.register()
	return nc
}

func (ctl *NameTitleController) register() {
	nametitles := ctl.router.Group("/nametitles")

	nametitles.GET("", ctl.ListNameTitle)
	nametitles.POST("", ctl.CreateNameTitle)
	nametitles.GET(":id", ctl.GetNameTitle)
	nametitles.PUT("id", ctl.UpdateNameTitle)
	nametitles.DELETE(":id", ctl.DeleteNameTitle)
}
